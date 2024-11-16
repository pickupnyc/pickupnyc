import { useState, useEffect } from "react"

export default function AllMatches() {
    const [matches, setMatches] = useState([]);
    const [uniqueBoroughs, setUniqueBoroughs] = useState([]);
    
    useEffect(() => {
        const allMatches = async () => {
            const response = await fetch('/api/pickup');
            const data = await response.json();
            console.log(data);
            setMatches(data);
        }
        allMatches();
    },[])

    useEffect(()=>{
        setUniqueBoroughs([...new Set(matches.map((match) => match.borough))]);
        console.log(uniqueBoroughs);
        console.log("The line right abobe this is the list of unique boroughs.");
    }, [matches])

    return (
        <>
            
            <div className="accordion" id="match_accordion">
                {uniqueBoroughs.map((borough)=>{
                    return (
                        <div className="accordion-item" key={borough}>
                            <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${borough}`} aria-expanded="true" aria-controls={`collapse${borough}`}>
                                {borough}
                            </button>
                            </h2>
                            <div id={`collapse${borough}`} className="accordion-collapse collapse show" data-bs-parent="#match_accordion">
                                <div className="accordion-body">
                                    Well. These are supposed to be
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>


            {/* <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Accordion Item #1
                    </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classNamees that we use to style each element. These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                    </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Accordion Item #2
                    </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classNamees that we use to style each element. These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                    </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Accordion Item #3
                    </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classNamees that we use to style each element. These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                    </div>
                    </div>
                </div>
                </div> */}
        </>
    )
}