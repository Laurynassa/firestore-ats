import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "@firebase/firestore";
import { app } from "../Firebase/firebase.js";

const Display = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(app);
      const formDataRef = collection(db, "contacts");

      try {
        const snapshot = await getDocs(formDataRef);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFormData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="data-container">
      <div>
        <h2>Data Display</h2>
        {formData.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th className="table-header">Client Name</th>
                <th className="table-header">Question</th>
              </tr>
            </thead>
            <tbody>
              {formData.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.question}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Please wait data is being loaded!</p>
        )}
      </div>
    </div>
  );
};

export default Display;
