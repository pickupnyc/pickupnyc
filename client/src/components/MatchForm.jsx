import { useForm } from "react-hook-form";

import { useUser } from "../hooks/useUser";

const MatchForm = ({onClose}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { user } = useUser();

    const onSubmit = (data) => {
        const formDataWithUserId = {
            ...data,
            host: user.user_id,
        };
        console.log("Form Data:", formDataWithUserId);
        async function createMatch() {
            try {
                const response = await fetch("/api/pickup/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formDataWithUserId),
                });
                const data = await response.json();
                console.log("Match created:", data);
                onClose();
            } catch (error) {
                console.error("Error creating match:", error);
            }
        }
        createMatch();
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
                    defaultValue=""
                >
                    <option value="" disabled>
                        Select a borough
                    </option>
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
                <input id="premium" type="checkbox" {...register("premium")} className="mr-2" />
            </div>

            <button
                type="submit"
                className="flex w-full justify-center rounded-full border-2 border-darkGreen bg-darkGreen px-6 py-2 text-white hover:bg-white hover:text-darkGreen"
            >
                Submit
            </button>
        </form>
    );
};

export default MatchForm;
