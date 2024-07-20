import React, { useState, useEffect } from 'react';
import PetBirthdays from './components/PetBirthdayList';

function App() {
  const [birthdays, setBirthdays] = useState([]);
  const [petSelection, setPetSelection] = useState('all');

  useEffect(() => {
    const petBirthdayUrls = [
      { petType: 'dog', url: 'http://127.0.0.1:8000/api/dogs' },
      { petType: 'cat', url: 'http://127.0.0.1:8000/api/cats' },
    ];

    const allBirthdayData = petBirthdayUrls.map(({ petType, url }) => {
      return fetch(url)
        .then((res) => res.json())
        .then((data) => data.map((pet) => ({ ...pet, petType })));
    });

    (async () => {
      const allBirthdays = await Promise.allSettled(allBirthdayData).then(
        (birthdayData) =>
          birthdayData.map(({ value }) => value).filter((arr) => !!arr),
      );

      setBirthdays(allBirthdays.flat(2));
    })();
  }, []);

  return (
    <>
      <h1>Pet Birthdays!</h1>
      <select
        value={petSelection}
        onChange={(e) => setPetSelection(e.target.value)}
      >
        <option value="all">All Pets</option>
        <option value="dog">Dogs</option>
        <option value="cat">Cats</option>
      </select>
      <PetBirthdays birthdays={birthdays} petSelection={petSelection} />
    </>
  );
}

export default App;
