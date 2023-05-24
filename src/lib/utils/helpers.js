import axios from "axios";

export async function getRepoStats(repository) {
  const response = await axios.get(
    `https://api.github.com/repos/${repository}`
  );
  const data = response.data;
  const stars = data.stargazers_count;
  const forks = data.forks_count;
  console.log(stars, forks);
  return { stars, forks };
}

export function convertDate(dateStr) {
  const [day, month, year] = dateStr.split("/");

  const dayNum = parseInt(day, 10);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[parseInt(month, 10) - 1];

  const daySuffixes = ["st", "nd", "rd"];
  const daySuffix =
    dayNum > 3 && dayNum < 21 ? "th" : daySuffixes[(dayNum - 1) % 10] || "th";

  return `${dayNum}${daySuffix} ${monthName} ${year}`;
}
