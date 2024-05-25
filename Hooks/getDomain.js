const getDomain = (email) => {
    const parts = email.split("@");
    if (parts.length === 2) {
        const partsOfDomain = parts[1].split('.')
        if (partsOfDomain.length !== 1) {
            const domain = partsOfDomain[0]
            return domain;
        } else {
            return ''
        }
    } else {
        return "";
    }
};

module.exports = getDomain