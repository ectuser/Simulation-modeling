"use strict";
class Settings {
}
Settings.Width = 4;
Settings.Height = 4;
Settings.PixelsPerUnit = 100;
Settings.Speed = 100;
Settings.CellStates = [
    new CellState("empty", "#e6f2c7", -2),
    new CellState("seeds", "#000", 0),
    new CellState("young", "#b1b757", 0),
    new CellState("almost-done", "#f5ce8e", 3),
    new CellState("well-done", "#d85f51", 5),
    new CellState("late", "#641f31", -1),
];
