import axios from 'axios';
import Link from 'next/link';

export default async function CountriesPage() {
  const res = await axios.get('http://localhost:5000/api/available-countries');
  const countries = res.data;

  return (
    <div className="container">
      <header>
        <h1>Countries List</h1>
      </header> 
      <ul>
        {countries.map((country) => (
          <li key={country.countryCode}>
            <Link href={`/country-info/${country.countryCode}`}>
              {country.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}