export default function getWeather(cityParam) {
    const city = encodeURIComponent(cityParam.toLowerCase())
    const url=`https://api.weatherapi.com/v1/current.json?key=9e8c058a3ebc4d20b0e203133250908&q=${city}&aqi=yes&lang=it`
    return (
        fetch(url)
        .then(response => response.json())
    )
}