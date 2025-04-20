export default function showFunToast(msg, color) {
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
    position: "right",
    stopOnFocus: true,
  }).showToast();
}
