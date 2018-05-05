$(document).ready(function(){
    chrome.storage.sync.get("max_volume", function(data){
        value = (data.max_volume !== undefined) ? data.max_volume : 100;
        changeSettingsVolumeValue("max_volume", value);
    });
    chrome.storage.sync.get("min_volume", function(data){
        value = (data.min_volume !== undefined) ? data.min_volume : 0;
        changeSettingsVolumeValue("min_volume", value);
    });
});

$(".volume_slider").on("change", function(){
    const $this = $(this);
    const name = $this.attr("name");
    const value = this.value;

    changeSettingsVolumeValue(name, value);

    if(shouldChangeTheOtherValue(name, value)){
        inversedSetting = (name === "min_volume") ? "max_volume" : "min_volume";
        changeSettingsVolumeValue(inversedSetting, value);
    }
});

function changeSettingsVolumeValue(settingName, settingValue){
    var jsonConfig = {};
    jsonConfig[settingName] = settingValue;
    chrome.storage.sync.set(jsonConfig);
    $("input[name='" + settingName + "'").val(settingValue);
    console.log(settingName + " changed to " + settingValue);
}

function shouldChangeTheOtherValue(name, value){
    switch (name){
        case "max_volume":
            return ($("input[name='min_volume'").val() > value);
        case "min_volume":
            return ($("input[name='max_volume'").val() < value);
        default: break;
    } 
    return false;
}