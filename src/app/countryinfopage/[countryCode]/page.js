import axios from 'axios';
import Link from 'next/link';

export default async function CountryInfoPage({ params }) {
  const { countryCode } = params;

  try {
    // Fetch country info from your backend API
    const response = await axios.get(`http://localhost:5000/api/countryinfopage/${countryCode}`);
    const countryInfo = response.data;
    console.log(response.data);
    return (
      <div className="container">
        <h1>{countryInfo.commonName}</h1>
        <div>
          <img
            src={countryInfo.flagUrl}
            alt={`${countryInfo.commonName} flag`}
            width="100"
            height="60"
          />
          <h2>{countryInfo.officialName}</h2>
          <p>Region: {countryInfo.region}</p>
        </div>

        <h3>Border Countries:</h3>
        <ul>
          {countryInfo.borders?.map((border) => (
            <li key={border.countryCode}>
              <Link href={`/countryinfopage/${border.countryCode}`}>
                {border.commonName}
              </Link>
            </li>
          ))}
        </ul>

        <h3>Population History:</h3>
        <ul>
          {countryInfo.populationHistory?.map((entry) => (
            <li key={entry.year}>
              {entry.year}: {entry.population.toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error('Error fetching country info:', error.message);
    return <div>Error loading country information.</div>;
  }
}
