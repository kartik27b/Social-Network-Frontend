export const simulateDelay = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            return resolve();
        }, 2000);
    });
};
