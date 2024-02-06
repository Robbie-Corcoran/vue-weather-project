<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Banner -->
    <div v-if="route.query.preview" class="text-white p-4 bg-weather-secondary w-full text-center">
      <p>You are currently previewing this city, click "+" icon to start tracking this city</p>
    </div>

    <button class="flex flex-row-reverse w-full mt-5 fixed">
      <ToggleUnitButton
        :unitPreference="unitPreference"
        :toggleUnitPreference="toggleUnitPreference"
      />
    </button>

    <!-- Weather Overview -->
    <div class="flex flex-col items-center text-white py-9">
      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>

      <p class="text-sm mb-12">
        {{
          new Date(weatherData.currentTime).toLocaleDateString('en-us', {
            weekday: 'short',
            day: '2-digit',
            month: 'short'
          })
        }}
        {{ new Date(weatherData.currentTime).toLocaleTimeString('en-us', { timeStyle: 'short' }) }}
      </p>
      <p class="text-8xl mb-6">
        {{ Math.round(convertTemperature(weatherData.current.temp)) }}&deg;
      </p>
      <p>Feels like: {{ Math.round(convertTemperature(weatherData.current.feels_like)) }}&deg;</p>
      <p class="capitalize">scattered clouds</p>
      <img
        class="w-[150px] h-auto"
        :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
        alt=""
      />
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Hourly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4 text-lg">24 Hour Weather</h2>
        <div class="flex gap-10 overflow-x-scroll">
          <div
            v-for="hourData in weatherData.hourly.slice(0, -24)"
            :key="hourData.dt"
            class="flex flex-col gap-4 items-center"
          >
            <p class="whitespace-nowrap text-md">
              {{
                new Date(hourData.currentTime).toLocaleTimeString('en-us', {
                  hour: 'numeric'
                })
              }}
            </p>
            <img
              class="w-auto h-[50px] object-cover"
              :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
              alt=""
            />
            <p class="text-xl">{{ Math.round(convertTemperature(hourData.temp)) }}&deg;</p>
          </div>
        </div>
      </div>
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Weekly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4 text-lg">5 Day Forecast</h2>
        <div v-for="day in weatherData.daily.slice(0, -3)" :key="day.dt" class="flex items-center">
          <p class="flex-1">
            {{
              new Date(day.dt * 1000).toLocaleDateString('en-us', {
                weekday: 'long'
              })
            }}
          </p>
          <img
            class="w-[50px]"
            :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
            alt=""
          />
          <div class="flex gap-2 flex-1 justify-end">
            <p>H: {{ Math.round(convertTemperature(day.temp.max)) }}&deg;</p>
            <p>L: {{ Math.round(convertTemperature(day.temp.min)) }}&deg;</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Remove City -->
    <div
      class="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-500"
      @click="removeCity"
      v-if="!route.query.preview"
    >
      <i class="fa-solid fa-trash"></i>
      <p>Remove City</p>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import ToggleUnitButton from '../../components/ToggleUnits/ToggleUnitButton.vue';
import { metricToImperial } from '../../components/ToggleUnits/convertUnits.js';

const route = useRoute();
let lat = parseFloat(route.query.lat).toFixed(2);
let lng = parseFloat(route.query.lng).toFixed(2);

const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&appid=63766a46446a98de7b39171dc68dc049&units=metric`
    );

    // calc current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime = utc + 1000 * weatherData.data.timezone_offset;

    // calc hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });

    await new Promise((res) => setTimeout(res, 1000));

    return weatherData.data;
  } catch (err) {
    console.error(err);
  }
};

const weatherData = await getWeatherData();

const router = useRouter();

const unitPreference = ref('Metric');

const toggleUnitPreference = () => {
  unitPreference.value = unitPreference.value === 'Metric' ? 'Imperial' : 'Metric';
};

const convertTemperature = (temperature) => {
  return unitPreference.value === 'Metric' ? temperature : metricToImperial(temperature);
};

const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem(localStorage.key('savedCities')));

  const updatedCities = cities.filter((city) => city.id !== route.query.id);
  localStorage.setItem(localStorage.key('savedCities'), JSON.stringify(updatedCities));
  router.push({ name: 'home' });
};
</script>
