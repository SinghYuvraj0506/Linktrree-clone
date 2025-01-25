import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BACKGROUNDOPTIONS, BUTTONOPTIONS, BUTTONROUNDEDOPTIONS } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const axiosServices = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});


export const backgroundStyleGenerator = ({
  type,
  color,
  image,
}: {
  type?: BACKGROUNDOPTIONS;
  color?: string | string[]; // Single color or array for gradients
  image?: string; // Image URL
}) => {
  const style: any = {};

  switch (type) {
    case BACKGROUNDOPTIONS.FLAT:
      style["backgroundColor"] = color; // Flat background color
      break;

    case BACKGROUNDOPTIONS.GRADIENT:
      if (Array.isArray(color) && color.length === 2) {
        style["background"] = `linear-gradient(to bottom, ${color[0]}, ${color[1]})`; // Gradient from top to bottom
      } else {
        console.warn("Gradient type requires an array of two colors.");
      }
      break;

    case BACKGROUNDOPTIONS.IMAGE:
      if (image) {
        style["background"] = `url(${image}) no-repeat center center`; // Image background
        style["backgroundSize"] = "cover"; // Make the image cover the container
      } else {
        console.warn("Image type requires a valid image URL.");
      }
      break;

    default:
      console.warn("Invalid or unsupported background type.");
      break;
  }

  return style;
};


export const buttonStyleGenerator = ({
  type,
  rounded_type,
  colorButton,
  colorFont
}: {
  type?: BUTTONOPTIONS;
  rounded_type?: BUTTONROUNDEDOPTIONS;
  colorButton?: string;
  colorFont?: string;
}) => {
  const style: any = {
    color: colorFont,
    backgroundColor: type === BUTTONOPTIONS.FILL ? colorButton : "transparent",
    border: type === BUTTONOPTIONS.OUTLINE ? `2px solid ${colorButton}` : "none",
    boxShadow: "",
    borderRadius: "",
    transition: "all 0.3s ease", // Smooth hover transition
  };

  // Set box shadow based on type
  switch (type) {
    case BUTTONOPTIONS.SOFT_SHADOW:
      style.boxShadow = `0px 2px 4px rgba(0, 0, 0, 0.1)`; // Soft shadow
      break;
    case BUTTONOPTIONS.HARD_SHADOW:
      style.boxShadow = `0px 4px 6px rgba(0, 0, 0, 0.2)`; // Hard shadow
      break;
    default:
      break;
  }

  // Set border radius based on rounded_type
  switch (rounded_type) {
    case BUTTONROUNDEDOPTIONS.NO:
      style.borderRadius = "0px";
      break;
    case BUTTONROUNDEDOPTIONS.MEDIUM:
      style.borderRadius = "8px";
      break;
    case BUTTONROUNDEDOPTIONS.HIGH:
      style.borderRadius = "9999px"; // Fully rounded
      break;
    default:
      break;
  }

  // Add hover styles based on button type
  style[":hover"] = {};
  switch (type) {
    case BUTTONOPTIONS.FILL:
      style[":hover"].backgroundColor = lightenColor(colorButton, 0.2); // Lighten the fill color
      style[":hover"].color = darkenColor(colorFont, 0.2); // Darken the font color
      break;

    case BUTTONOPTIONS.OUTLINE:
      style[":hover"].backgroundColor = colorButton; // Use button color as background on hover
      style[":hover"].color = colorFont; // Change text color to the font color
      break;

    case BUTTONOPTIONS.SOFT_SHADOW:
      style[":hover"].boxShadow = `0px 4px 8px rgba(0, 0, 0, 0.2)`; // Increase shadow intensity
      break;

    case BUTTONOPTIONS.HARD_SHADOW:
      style[":hover"].boxShadow = `0px 6px 12px rgba(0, 0, 0, 0.3)`; // Increase shadow intensity
      break;

    default:
      break;
  }

  return style;
};

// Utility to lighten colors
function lightenColor(color: string, amount: number) {
  const [r, g, b] = hexToRgb(color);
  return `rgb(${Math.min(r + amount * 255, 255)}, ${Math.min(
    g + amount * 255,
    255
  )}, ${Math.min(b + amount * 255, 255)})`;
}

// Utility to darken colors
function darkenColor(color: string, amount: number) {
  const [r, g, b] = hexToRgb(color);
  return `rgb(${Math.max(r - amount * 255, 0)}, ${Math.max(
    g - amount * 255,
    0
  )}, ${Math.max(b - amount * 255, 0)})`;
}

// Utility to convert hex to RGB
function hexToRgb(hex: string): [number, number, number] {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : [0, 0, 0];
}