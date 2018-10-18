/*
 * huangzonghze
 * 10.17
 */
export default function getPageContainerStyle () {
    let containerStyle = {
        height: document.body.clientHeight - 45,
        overflow: 'scroll'
    };

    return containerStyle;
}

