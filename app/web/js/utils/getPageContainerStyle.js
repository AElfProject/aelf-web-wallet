/*
 * huangzonghze
 * 10.17
 */
export default function getPageContainerStyle () {
    let containerStyle = {
        height: document.body.clientHeight - 45,
        overflowY: 'scroll',
        overflowX: 'hidden'
    };

    return containerStyle;
}