import React from 'react';

function PetBirthdays({ birthdays, petSelection }) {
  const selectedBirthdays = birthdays.filter((birthday) =>
    petSelection !== 'all' ? birthday.petType === petSelection : true,
  );

  return (
    <ul>
      {selectedBirthdays.map(({ petType, name, birthday }, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={`${petType}-${index}`}>
          <strong>Name: </strong>
          {name}, <strong>Pet Type: </strong>
          {petType}, <strong>DOB: </strong>
          {birthday}
        </li>
      ))}
    </ul>
  );
}

export default PetBirthdays;
