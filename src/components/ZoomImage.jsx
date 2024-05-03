import React, { useEffect } from "react";

const ImageZoom = ({ imgID, resultID }) => {
  useEffect(() => {
    const img = document.getElementById(imgID);
    const result = document.getElementById(resultID);
    let lens, cx, cy;

    // Create lens element
    lens = document.createElement("div");
    lens.className = "img-zoom-lens";

    // Insert lens before the image
    img.parentElement.insertBefore(lens, img);

    // Calculate ratio between result DIV and lens
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;

    // Set background properties for the result DIV
    result.style.backgroundImage = `url('${img.src}')`;
    result.style.backgroundSize = `${img.width * cx}px ${img.height * cy}px`;

    // Event listeners for mouse and touch movements
    const moveLens = (e) => {
      e.preventDefault();
      const pos = getCursorPos(e);
      let x = pos.x - lens.offsetWidth / 2;
      let y = pos.y - lens.offsetHeight / 2;

      // Prevent lens from going outside the image
      if (x > img.width - lens.offsetWidth) {
        x = img.width - lens.offsetWidth;
      }
      if (x < 0) {
        x = 0;
      }
      if (y > img.height - lens.offsetHeight) {
        y = img.height - lens.offsetHeight;
      }
      if (y < 0) {
        y = 0;
      }

      // Set lens position
      lens.style.left = `${x}px`;
      lens.style.top = `${y}px`;

      // Display what the lens "sees"
      result.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
    };

    const getCursorPos = (e) => {
      const a = img.getBoundingClientRect();
      const x = e.pageX - a.left - window.pageXOffset;
      const y = e.pageY - a.top - window.pageYOffset;
      return { x, y };
    };

    // Event listeners for mouse and touch movements
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);

    // Clean up event listeners on component unmount
    return () => {
      lens.removeEventListener("mousemove", moveLens);
      img.removeEventListener("mousemove", moveLens);
      lens.removeEventListener("touchmove", moveLens);
      img.removeEventListener("touchmove", moveLens);
    };
  }, [imgID, resultID]); // Run effect when imgID or resultID changes

  return null; // This component doesn't render any JSX itself
};

export default ImageZoom;
