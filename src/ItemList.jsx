import React, { useState, useEffect } from 'react';

function ItemList() {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  );
  const [newItem, setNewItem] = useState({ name: '', weight: '', reps: 1 });

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const handleNameChange = (e) => {
    setNewItem({ ...newItem, name: e.target.value });
  };

  const handleWeightChange = (e) => {
    setNewItem({ ...newItem, weight: e.target.value });
  };

  const handleRepsChange = (e) => {
    setNewItem({ ...newItem, reps: parseInt(e.target.value) });
  };

  const addItem = () => {
    if (newItem.name && newItem.weight) {
      setItems([...items, { ...newItem }]);
      setNewItem({ ...newItem });
    }
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <div>
              <span>Name: {item.name}</span>
            </div>
            <div>
              <span>Weight: {item.weight}</span>
            </div>
            <div>
              <span>Reps: {item.reps}</span>
            </div>
            <div>
              <button onClick={() => removeItem(index)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <div>
          <label>Name: </label>
          <input type="text" value={newItem.name} onChange={handleNameChange} />
        </div>
        <div>
          <label>Weight: </label>
          <input
            type="text"
            value={newItem.weight}
            onChange={handleWeightChange}
          />
        </div>
        <div>
          <label>Reps: </label>
          <select value={newItem.reps} onChange={handleRepsChange}>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <button onClick={addItem}>Add Item</button>
      </div>
    </div>
  );
}

export default ItemList;
