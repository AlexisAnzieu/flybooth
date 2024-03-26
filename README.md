<br>

<h1 align="center">
<img width="350" alt="image" src="https://github.com/AlexisAnzieu/flybooth/assets/11615615/2860c09a-447e-40f5-9edc-38738028e2cd">
 </h1>

<h4 align="center">- Photobooth on fly, from small gatherings to big venues -</h4>

<div align="center">

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=AlexisAnzieu_flybooth&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=AlexisAnzieu_flybooth)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=AlexisAnzieu_flybooth&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=AlexisAnzieu_flybooth)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=AlexisAnzieu_flybooth&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=AlexisAnzieu_flybooth)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=AlexisAnzieu_flybooth&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=AlexisAnzieu_flybooth)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

</div>

<p align="center">
  <a href="#about">About</a> •
  <a href="#features">Features</a> •
  <a href="#tiers">Tiers</a> •
  <a href="#installation">Installation</a> •
  <a href="#architecture-diagram">Architecture Diagram</a>
</p>

---

## About

As a venue organizer, I wanted to create an app so people could post some pictures of them during the event and expose them to a central screen. Then give them the ability to download the picture. I wanted to make it open source so people could use it for their own events.

## Features

- Dynamic QR code generation
- Email sending
- Image moderation through IA
- Picture coverflow style
- Picture download (single or bulk)
- Picture upload
- PIN for easy access on external screen
- Internationalization

## Tiers

This project uses free Saas products to run:

- **Backend API**: Vercel
- **Deployment**: Vercel
- **Email sender**: Resend
- **Image moderation**: Sighengine
- **Image optimization**: Vercel
- **Image storage**: Cloudinary
- **Mysql Database**: Turso
- **Redis Database**: Upstash

## Installation

1. Make sure that you have [nodeJS](https://nodejs.org/en/) installed on your machine.
2. Install the dependencies by running `npm install`.
3. Fill environment variables in a `.env.local` file at the root of the project. You can find the list of environment variables in the `.env.local.example` file.
4. Run the development server by running `npm run dev`.
5. (optionnal ) If you want to preview the email template, go to `./component/react-email`, type `npm i` then `npm run dev`.

## Architecture Diagram

### Flybooth workflow

```mermaid
sequenceDiagram
    User->>+Flybooth: generate a flybooth
      par
    Flybooth->>+Redis: create a short link
    and
    Flybooth->>+Flybooth: generate a QR code
    end
    User->>+Flybooth: add a picture
    Flybooth->>+Cloudinary: upload the picture
    Flybooth->>+Sightengine: moderation check
        alt comport nudity
        Sightengine->>Cloudinary: Delete image
        end
    User->>+Flybooth: add a message
    Flybooth->>+Mysql: insert the message
    User->>+Flybooth: access to gallery
    Flybooth->>+Cloudinary: access to folder based on uuid
    Cloudinary->>+Flybooth: list of pictures
    User->>+Cloudinary: download a single picture
    Cloudinary->>+User: give picture link
    User->>+Flybooth: download multi picture
    Flybooth->>+Cloudinary: generate an archive link
    Cloudinary->>+User: give archive link

```

### Join a flybooth

```mermaid
sequenceDiagram
    User->>+Flybooth: join a flybooth
    Flybooth->>+Redis: ask for the full uuid
    Redis->>+Flybooth: give back the full uuid
    Flybooth->>+User: redirect to the coverflow page

```

### Auto delete server images

```mermaid
sequenceDiagram
    Upstash->>+Flybooth: fetch delete-images endpoint
    Flybooth->>+Cloudinary: delete all images older than 7 days
```
