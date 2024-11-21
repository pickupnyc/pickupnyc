import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditMatchForm = ({ matchData }) => {
    let game = matchData.pickupGame

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const navigate = useNavigate();

    // Populate the form with the passed matchData
    useEffect(() => {
        if (game) {
            reset({
                title: game.title || "",
                borough: game.borough || "",
                date: game.date ? game.date.split("T")[0] : "",
                time: game.time || "",
                location: game.location || "",
                rules: game.rules || "",
                capacity: game.capacity || 0,
                premium: game.premium || false,
            });
        }
    }, [game, reset]);

    const onSubmit = async (data) => {
        const formattedDate = new Date(data.date).toISOString();

        const payload = {
            ...data,
            date: formattedDate, // Replace the date with the formatted one
            host: game.host, // Ensure host is included
        };

        console.log("Payload being sent to backend:", payload); // Debug log

        try {
            const response = await fetch(`/api/pickup/${game.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Failed to update match");
            }

            console.log("Match updated successfully");
            navigate("/matches"); // Navigate back to matches list
        } catch (error) {
            console.error("Error updating match:", error);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this match?"
        );
        if (!confirmDelete) return;

        try {
            const response = await fetch(`/api/pickup/${game.id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete match");
            }

            console.log("Match deleted successfully");
            navigate("/matches");
        } catch (error) {
            console.error("Error deleting match:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="title" className="block font-bold">
                    Title
                </label>
                <input
                    id="title"
                    {...register("title", { required: "Title is required" })}
                    className="w-full rounded border p-2"
                />
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            </div>

            <div>
                <label htmlFor="borough" className="block font-bold">
                    Borough
                </label>
                <select
                    id="borough"
                    {...register("borough", { required: "Borough is required" })}
                    className="w-full rounded border p-2"
                >
                    <option value="Manhattan">Manhattan</option>
                    <option value="Brooklyn">Brooklyn</option>
                    <option value="Queens">Queens</option>
                    <option value="Bronx">Bronx</option>
                    <option value="Staten Island">Staten Island</option>
                </select>
                {errors.borough && <p className="text-red-500">{errors.borough.message}</p>}
            </div>

            <div>
                <label htmlFor="date" className="block font-bold">
                    Date
                </label>
                <input
                    id="date"
                    type="date"
                    {...register("date", { required: "Date is required" })}
                    className="w-full rounded border p-2"
                />
                {errors.date && <p className="text-red-500">{errors.date.message}</p>}
            </div>

            <div>
                <label htmlFor="time" className="block font-bold">
                    Time
                </label>
                <input
                    id="time"
                    type="time"
                    {...register("time", { required: "Time is required" })}
                    className="w-full rounded border p-2"
                />
                {errors.time && <p className="text-red-500">{errors.time.message}</p>}
            </div>

            <div>
                <label htmlFor="location" className="block font-bold">
                    Location
                </label>
                <input
                    id="location"
                    type="text"
                    {...register("location", { required: "Location is required" })}
                    placeholder="Enter a street address"
                    className="w-full rounded border p-2"
                />
                {errors.location && <p className="text-red-500">{errors.location.message}</p>}
            </div>

            <div>
                <label htmlFor="rules" className="block font-bold">
                    Rules
                </label>
                <textarea id="rules" {...register("rules")} className="w-full rounded border p-2" />
            </div>

            <div>
                <label htmlFor="capacity" className="block font-bold">
                    Capacity
                </label>
                <input
                    id="capacity"
                    type="number"
                    {...register("capacity", { required: "Capacity is required" })}
                    className="w-full rounded border p-2"
                />
                {errors.capacity && <p className="text-red-500">{errors.capacity.message}</p>}
            </div>

            <div>
                <label htmlFor="premium" className="block font-bold">
                    Premium
                </label>
                <input
                    id="premium"
                    type="checkbox"
                    {...register("premium")}
                    className="mr-2"
                />
            </div>

            <div className="flex justify-between space-x-4">
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-full border-2 border-darkGreen bg-darkGreen px-6 py-2 text-white hover:bg-white hover:text-darkGreen"
                >
                    Update Match
                </button>
                <button
                    type="button"
                    onClick={handleDelete}
                    className="flex w-full justify-center rounded-full border-2 border-red-500 bg-red-500 px-6 py-2 text-white hover:bg-white hover:text-red-500"
                >
                    Delete Match
                </button>
            </div>
        </form>
    );
};

EditMatchForm.propTypes = {
    matchData: PropTypes.object.isRequired,
};

export default EditMatchForm;


