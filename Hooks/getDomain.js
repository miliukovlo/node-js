const getDomain = (email) => {
    const parts = email.split("@");
    if (parts.length === 2) {
        const domainParts = parts[1].split('.');
        if (domainParts.length === 2 &&
            domainParts[0] !== '' &&
            domainParts[1] !== '' &&
            domainParts[0] === domainParts[0].toLowerCase() &&
            domainParts[1] === domainParts[1].toLowerCase()) {
            return domainParts[0].trim();
        } else {
            return '';
        }
    } else {
        return "";
    }
};

module.exports = getDomain