import ReactGA from "react-ga";

const UseAnalyticsEventTracker = (category = "Blog Category") => {

    const eventTracker = (action = "test action", label = "test label") => {
        ReactGA.event({ category, action, label });
    }
    return eventTracker;

    // return ReactGA.event({
    //     category : '',
    //     action : '',
    //     label : '',
        
    // })
}

export default UseAnalyticsEventTracker;    