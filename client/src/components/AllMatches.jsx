import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function AllMatches({ user }) {
  const [matches, setMatches] = useState([]);
  const [uniqueBoroughs, setUniqueBoroughs] = useState([]);
  const [activeKey, setActiveKey] = useState(null);

  useEffect(() => {
    const allMatches = async () => {
      const response = await fetch('/api/pickup');
      const data = await response.json();
      console.log(data);
      setMatches(data);
    }
    allMatches();
  }, []);


  useEffect(() => {
    setUniqueBoroughs([...new Set(matches.map((match) => match.borough))]);
    console.log(uniqueBoroughs);
    console.log("The line right above this is the list of unique boroughs.");
    console.log(user);
    console.log("That is the user");
  }, [matches]);

  const toggleAccordion = (borough) => {
    setActiveKey(activeKey === borough ? null : borough);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-2">
      {uniqueBoroughs.map((borough) => {
        const isActive = activeKey === borough;
        const boroughId = borough.split(' ')[0];
        
        return (
          <div 
            key={boroughId}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleAccordion(borough)}
              className={`w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors duration-150 ${
                isActive ? 'bg-gray-50' : ''
              }`}
            >
              <div className="text-lg font-medium text-gray-900">
                {borough}
              </div>
              <ChevronDown 
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  isActive ? 'rotate-180' : ''
                }`}
              />
            </button>

            <div
              className={`transition-all duration-200 ease-in-out ${
                isActive ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              } overflow-hidden`}
            >
              <div className="p-4 bg-white">
                <ul className="list-group">
                        {matches
                        .filter(match => match.borough === borough)
                        .map(match => (
                            <li className="list-group-item border-b border-gray-200 py-4" key={match.id}>
                                <div className="grid grid-cols-4 gap-4 items-center">
                                    <div className="text-gray-700">{match.title} : {Number(match.capacity/2)} v {Number(match.capacity/2)}</div>
                                    <div className="text-gray-700">{match.location}</div>
                                    <div className="text-gray-700">{match.count} / {match.capacity}</div>
                                    <div className="text-gray-700">{formatDate(match.date)}</div>
                                    <div className="flex gap-8 items-center">
                                        <button className={`text-sm text-start ${user.user_id === match.host ? 'text-gray-400' : 'text-blue-600 hover:text-blue-800'}`}  disabled={user.user_id === match.host}>
                                            Join
                                        </button>
                                        <button className={`text-sm text-start ${user.user_id !== match.host ? 'text-gray-400' : 'text-blue-600 hover:text-blue-800'}`} disabled={user.user_id !== match.host}>
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))
                        }
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}