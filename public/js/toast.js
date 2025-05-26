export default function showFunToast(msg, color, position = "right") {
  Toastify({
    text: msg,
    duration: 4000,
    close: true,
    style: {
      background: color,
      color: "#fff",
      fontWeight: "bold",
      fontFamily: "Poppins",
    },
    gravity: "bottom",
    position,
    stopOnFocus: true,
  }).showToast();
}
