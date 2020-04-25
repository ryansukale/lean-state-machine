const toArray = item => item ? (Array.isArray(item) ? item : [item]) : [];
export default toArray;