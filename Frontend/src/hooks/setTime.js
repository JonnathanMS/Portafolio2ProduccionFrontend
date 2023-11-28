
var timeoutElem; // Variable para guardar el identificador del timeout que voy a usar

export const setTimeOutFunction = (elem, setElem, message) => {
    timeoutElem = setTimeout(() => {
        if (elem) {
            setElem(false);
            alert(message);
        }
    }, 40000);
};

export const clearTimeOutFunction = () => {
    clearTimeout(timeoutElem);
};