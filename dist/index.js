"use strict";
class Planet {
    constructor(distFromOrbitalCenter, size, color) {
        this.degToRad = (deg) => deg * Math.PI / 100;
        this.distFromOrbitalCenter = distFromOrbitalCenter;
        this.size = size;
        this.color = color;
        this.rad = 0;
        this.speed = 0.01;
        this.pointX = 0;
        this.pointY = 0;
        this.showOrbitalPath = false;
    }
    setAngleRad(rad) {
        this.rad = rad;
    }
    setAngleDeg(deg) {
        this.setAngleRad(this.degToRad(deg));
    }
    setSpeedRad(radsPerTick) {
        this.speed = radsPerTick;
    }
    setSpeedDeg(degsPerTick) {
        this.setSpeedRad(this.degToRad(degsPerTick));
    }
    orbit(orbitalCenter) {
        if (this.showOrbitalPath) {
            ctx.strokeStyle = "white";
            ctx.beginPath();
            ctx.arc(orbitalCenter.pointX, orbitalCenter.pointY, this.distFromOrbitalCenter, 0, 2 * Math.PI);
            ctx.stroke();
        }
        this.render();
        this.pointX = orbitalCenter.pointX + this.distFromOrbitalCenter * Math.sin(this.rad);
        this.pointY = orbitalCenter.pointY + this.distFromOrbitalCenter * Math.cos(this.rad);
        this.rad = this.rad > -2 * Math.PI ? this.rad + this.speed : 0;
    }
    render() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pointX, this.pointY, this.size / 2, 0, 2 * Math.PI);
        ctx.fill();
    }
}
class Star {
    constructor(x, y, size) {
        this.pointX = x;
        this.pointY = y;
        this.size = size;
    }
    render() {
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(this.pointX, this.pointY, this.size / 2, 0, 2 * Math.PI);
        ctx.fill();
    }
}
const canvas = document.querySelector("#space");
const ctx = canvas.getContext("2d");
const MAPSIZE = 1000;
const SUNSIZE = 200;
const SUNPOS = MAPSIZE / 2;
const TICKSPEED = 1;
canvas.width = MAPSIZE;
canvas.height = MAPSIZE;
ctx.fillStyle = "black";
ctx.fillRect(0, 0, MAPSIZE, MAPSIZE);
let timeOutId = null;
const sun = new Star(SUNPOS, SUNPOS, SUNSIZE);
const p1 = new Planet(180, SUNSIZE / 3, "red");
const p2 = new Planet(300, SUNSIZE / 2.5, "green");
const p3 = new Planet(410, SUNSIZE / 4, "purple");
const p4 = new Planet(50, SUNSIZE / 8, "blue");
const planets = [p1, p2, p3, p4];
function tick() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, MAPSIZE, MAPSIZE);
    sun.render();
    p1.orbit(sun);
    p2.orbit(sun);
    p3.orbit(sun);
    p4.orbit(p3);
    timeOutId = setTimeout(tick, TICKSPEED);
}
window.onload = () => {
    p1.setSpeedDeg(0.5);
    p2.setSpeedDeg(0.3);
    p3.setSpeedDeg(0.1);
    planets.forEach(planet => {
        planet.showOrbitalPath = true;
    });
    tick();
};
