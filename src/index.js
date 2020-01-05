// Executes this arrow function after everything loaded up
window.onload = () => {
    import("./presentation/pexeso-gui.js")
        .then((module) => {
            const Pexeso = module.PexesoGUI;
            const component = document.getElementById("game");
            var columns = prompt("Zadej sude cislo: ");

            const game = new Pexeso(component, columns);
            game.draw();
        });
};
