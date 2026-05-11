# Proof of Concept for the Bachelor’s Final Thesis: Browser Fingerprint Collector

## Purpose

The purpose of the proof of concept is to implement the main browser fingerprinting techniques and to assess their effectiveness across vaious web browsers: Google Chrome, Mozilla Firefox, Brave, Microsoſt Edge (on devices with the Windows operating system) and Safari (on devices with the macOS operating system) 

## Project Description

The **Browser Fingerprint Collector** is a web application designed to generate fingerprints for a browser based on several attributes. It collects data from multiple sources to create a profile of the user's browser through various fingerprinting techniques, including:
- **HTTP Header Fingerprinting**
- **JavaScript Object Fingerprinting**
- **Font Fingerprinting**
- **Canvas API Fingerprinting**
- **WebGL API Fingerprinting**
- **Web Audio API Fingerprinting**
- **Extension Detection** (detecting AdBlocker usage)
- **CSS Fingerprinting**

## Prerequisites
- **Node.js**: Ensure you have Node.js installed. [Download Node.js](https://nodejs.org/).

## Launch Instructions
Follow these steps to set up and launch the project:
- **Clone the Repository**:
Clone the project repository to your local environment:
``` bash
   git clone <repository-url>
```
- **Navigate to the Project**:
Enter the project directory:
``` bash
   cd <project-folder>
```
- **Install Dependencies**:
Install the required dependencies using npm:
``` bash
   npm install
```
- **Start the Server**:
Use this to start the server:
``` bash
   npm run devStart 
```
- **Access the Application**:
Open your browser and navigate to the following address:
``` 
   http://localhost:3000
```
- **Collect Fingerprints**:
Use the "Collect Fingerprint" button to initiate fingerprint generation and store the results locally.
