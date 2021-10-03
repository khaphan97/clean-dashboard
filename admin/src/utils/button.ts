export function parseButtons(buttons: any) {
  buttons.forEach((btn: any) => {
    if (btn.event === 'capture' && typeof btn.data === 'string') {
      btn.data = JSON.parse(btn.data);
    }
  });
  return buttons;
}
