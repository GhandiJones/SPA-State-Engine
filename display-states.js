/* 
 * Filename: display-states.js
 * Created by: Daniel Turner
 * Created on: Aug 3, 2018
 * Last Updated on: Oct 16, 2018
 * GUI State Engine v.04
 */

class DisplayStateMachine {
    
    /*
     *  o is an object requiring the default state/view and navClass is the nav class that will affect the changes
     */
    constructor(o){
        this.defaultState = o.defaultState;
        this.navClass = o.navClass;
        this.defaultTimeOffset = 5;
        this.current = this.loadSessionState();
        this.isInit = false;
        this.pushState(this.current);
    }

    pushState(state) {
        //console.log(this.current + " : " + state);
        
        if(this.current === state && this.isInit){
            return;
        }
        
        if(state === null){
            this.current = this.loadSessionState();
        }
        
        this.isInit = true;
        
        $("#" + this.current).hide();
        $("." + this.navClass + "[data-link='" + this.current + "']").removeClass("active");
        
        this.setSessionState(state);
        this.current = state;
        
        $("." + this.navClass + "[data-link='" + this.current + "']").addClass("active");
        $("#" + this.current).show();
        
        history.pushState(this.current, this.current);

    }    
    
    popState(state) {
        //console.log(this.current + " : " + state);
        
        this.setSessionState(state);
        if(state === null){
            state = this.defaultState;
        }
        
        $("#" + this.current).hide();
        $("." + this.navClass + "[data-link='" + this.current + "']").removeClass("active");
        
        this.current = state;
        
        $("." + this.navClass + "[data-link='" + this.current + "']").addClass("active");
        $("#" + this.current).show();
        
        history.replaceState(this.current, this.current);
    }    
    
    setSessionState(state) {
        sessionStorage.setItem('state', state);
        sessionStorage.setItem('stateCheckIn', new Date());
    }
    
    loadSessionState() {
        if(!sessionStorage.getItem('stateCheckIn') || !sessionStorage.getItem('state')){
            return this.defaultState;
        }
        
        let minutes = this.defaultTimeOffset;
        let timeSaved = new Date(sessionStorage.getItem('stateCheckIn'));
        timeSaved.setMinutes(timeSaved.getMinutes() + minutes);
        let now = new Date();
        return (timeSaved > now) ? sessionStorage.getItem('state') : this.defaultState;
    }
    
}
