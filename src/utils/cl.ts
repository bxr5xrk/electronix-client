export const cl = (...classes: Array<string | undefined | boolean | null>) => {
    return classes.filter((i) => Boolean(i) && typeof i === 'string').join(' ');
};
