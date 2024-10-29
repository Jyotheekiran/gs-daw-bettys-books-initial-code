const express = require("express");
const router = express.Router();
const request = require("request");

// Display form and handle weather info for a specified city
router.get('/londonnow', function(req, res, next) {
    let apiKey = 'd8ea8e898291c37ce9380297159b3941';
    let city = req.query.city || 'london'; // Default to 'london' if no city is specified
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    request(url, function (err, response, body) {
        if (err) {
            next(err);
        } else {
            let weather = JSON.parse(body);
            let weatherHTML = `<div style="font-family: Arial, sans-serif; text-align: center; margin-top: 20px;">`;

            if (weather && weather.main) {
                weatherHTML += `
                    <h1 style="color: #333;">Weather in ${weather.name}</h1>
                    <p style="font-size: 1.2em; color: #555;">
                        <strong>Temperature:</strong> ${weather.main.temp} °C<br>
                        <strong>Humidity:</strong> ${weather.main.humidity}%<br>
                        <strong>Wind Speed:</strong> ${weather.wind.speed} m/s<br>
                        <strong>Description:</strong> ${weather.weather[0].description}<br>
                        <strong>Pressure:</strong> ${weather.main.pressure} hPa<br>
                        <strong>Visibility:</strong> ${weather.visibility / 1000} km
                    </p>
                `;
            } else {
                weatherHTML += `<p style="color: red;">No data found for the city. Please try a different city.</p>`;
            }

            // Add the form below the weather information
            weatherHTML += `
                <form action="./londonnow" method="get" style="font-family: Arial, sans-serif; margin-top: 20px;">
                    <label for="city">Enter City Name:</label>
                    <input type="text" id="city" name="city" required>
                    <button type="submit">Get Weather</button>
                </form>
            </div>`;

            res.send(weatherHTML);
        }
    });
});

module.exports = router;
