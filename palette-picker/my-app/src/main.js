const initialData = [
  {
    uuid: "5affd4e4-418d-4b62-beeb-1c0f7aaff753",
    title: "Marcy",
    colors: ["#c92929", "#2f5a8b", "#327a5f"],
    temperature: "neutral",
  },
  {
    uuid: "32521ef4-d64c-4906-b06d-f3d0d6b16e0f",
    title: "Sleek and Modern",
    colors: ["#3A5199", "#2F2E33", "#D5D6D2"],
    temperature: "cool",
  },
  {
    uuid: "8b144d62-faa7-4226-87e1-096d7c1bedc7",
    title: "Winter Reds",
    colors: ["#A10115", "#C0B2B5", "#600A0A"],
    temperature: "warm",
  },
];

const createPaletteElement = (paletteData) => {
  const paletteContainer = document.createElement("div");
  paletteContainer.classList.add("palette");
  const paletteTitleElement = document.createElement("h3");
  paletteTitleElement.textContent = paletteData.title;

  const colorsList = document.createElement("ul");
  colorsList.classList.add("colors-list");

  paletteData.colors.forEach((color) => {
    const colorContainer = document.createElement("div");
    colorContainer.classList.add("color-container");

    colorContainer.style.backgroundColor = color;

    const hexCode = document.createElement("div");
    hexCode.textContent = color;
    hexCode.classList.add("hex-code");

    const copyButton = document.createElement("button");
    copyButton.textContent = "Copy Hex Code";
    copyButton.classList.add("copy-button");

    copyButton.addEventListener("click", function () {
      const tempInput = document.createElement("input");
      tempInput.value = color;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
    });

    colorContainer.appendChild(hexCode);
    colorContainer.appendChild(copyButton);
    colorsList.appendChild(colorContainer);
  });

  const temperatureInfo = document.createElement("div");
  temperatureInfo.textContent = `Temperature: ${paletteData.temperature}`;
  temperatureInfo.classList.add("temperature-info");

  switch (paletteData.temperature) {
    case "neutral":
      temperatureInfo.style.backgroundColor = "grey";
      break;
    case "cool":
      temperatureInfo.style.backgroundColor = "blue";
      break;
    case "warm":
      temperatureInfo.style.backgroundColor = "red";
      break;

    default:
      break;
  }

  const deletePaletteButton = document.createElement("button");
  deletePaletteButton.textContent = "Delete Palette";
  deletePaletteButton.classList.add("delete-palette-button");

  deletePaletteButton.addEventListener("click", () => {
    const palettesSection = document.getElementById("palettes-section");
    palettesSection.removeChild(paletteContainer);
  });

  paletteContainer.appendChild(paletteTitleElement);
  paletteContainer.appendChild(colorsList);
  paletteContainer.appendChild(temperatureInfo);
  paletteContainer.appendChild(deletePaletteButton);
  return paletteContainer;
};

const addPalettesToSection = () => {
  const palettesSection = document.getElementById("palettes-section");
  initialData.forEach((paletteData) => {
    const paletteElement = createPaletteElement(paletteData);
    palettesSection.appendChild(paletteElement);
  });
};

const colorPickerForm = document.getElementById("color-picker-form");
colorPickerForm.addEventListener("submit", (e) => {
    e.preventDefault()
  const paletteTitle = document.getElementById("paletteTitle").value;
  const color1 = document.getElementById("color1").value;
  const color2 = document.getElementById("color2").value;
  const color3 = document.getElementById("color3").value;
  const temperature = document.querySelector(
    'input[name="temperature"]:checked'
  ).value;

  const newPalette = {
    title: paletteTitle,
    colors: [color1, color2, color3],
    temperature: temperature,
  };

  const newPaletteElement = createPaletteElement(newPalette)
  const palettesSection = document.getElementById('palettes-section')
  palettesSection.appendChild(newPaletteElement)

  colorPickerForm.reset()
});

document.addEventListener("DOMContentLoaded", addPalettesToSection);
