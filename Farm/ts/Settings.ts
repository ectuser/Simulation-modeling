abstract class Settings{
    public static Width : number = 4;
    public static Height : number = 4;
    public static PixelsPerUnit : number = 100;
    public static Speed : number = 2000;
    public static CellStates : CellState[] = [
        new CellState("empty", "#e6f2c7", -2),
        new CellState("seeds", "#000", 0),
        new CellState("young", "#b1b757", 0),
        new CellState("almost-done", "#f5ce8e", 3),
        new CellState("well-done", "#d85f51", 5),
        new CellState("late", "#641f31", -1),
    ];
}