const gemBanner = document.querySelector(".gem-banner");
let rafId = null;

gemBanner.addEventListener("mousemove", (e) => {
  if (rafId) cancelAnimationFrame(rafId);

  rafId = requestAnimationFrame(() => {
    const rect = gemBanner.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (reduced intensity for subtlety)
    const rotateX = ((y - centerY) / centerY) * 4;
    const rotateY = ((centerX - x) / centerX) * 4;

    // Calculate distance from cursor to create bulge effect
    const distance = Math.sqrt(
      Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
    );

    // Update CSS custom properties
    gemBanner.style.setProperty("--rotateX", `${rotateX}deg`);
    gemBanner.style.setProperty("--rotateY", `${rotateY}deg`);
    gemBanner.style.setProperty("--mouseX", `${x}px`);
    gemBanner.style.setProperty("--mouseY", `${y}px`);
    gemBanner.style.setProperty("--scale", "1.02");
    gemBanner.classList.add("hovering");
  });
});

gemBanner.addEventListener("mouseleave", () => {
  if (rafId) cancelAnimationFrame(rafId);

  gemBanner.style.setProperty("--rotateX", "0deg");
  gemBanner.style.setProperty("--rotateY", "0deg");
  gemBanner.style.setProperty("--scale", "1");
  gemBanner.classList.remove("hovering");
});
