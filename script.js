function checkoutTelegram() {

  let message =
`Ciao BPFAM, vorrei info su:\n\n`;

  let finalTotal = 0;

  cart.forEach(item => {
    finalTotal += item.total;
    message += `${item.name} • ${item.size} • x${item.qty} = €${item.total}\n`;
  });

  message += `\nTotale finale: €${finalTotal}`;

  navigator.clipboard.writeText(message);

  alert("Ordine copiato. Ora incollalo nella chat Telegram BPFAM.");

  window.open("https://t.me/BPFAMPRIVATE_CLUB", "_blank");
}