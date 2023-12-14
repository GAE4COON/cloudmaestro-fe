import SelectEc2Toggle from "./cost/SelectEc22Toggle";
import SelectRdsToggle from "./cost/SelectRdsToggle";
import SelectS3Toggle from "./cost/SelectS3Toggle";
import SelectWafToggle from "./cost/SelectWafToggle";

const costToggle = (props) => {
    const {diagram, showToggle, showSelectToggle, finalToggleValue, setFinalToggleValue, handleNodeSelect} = props;
    return(
        <>
    {showToggle &&
        showSelectToggle.value &&
        showSelectToggle.key.includes("EC2") &&
        !showSelectToggle.key.includes(" ") && (
          <SelectEc2Toggle
            resourceKey={showSelectToggle.key}
            diagram={diagram}
            uniquekey={showSelectToggle.key}
            finalToggleValue={finalToggleValue}
            setFinalToggleValue={setFinalToggleValue}
            onToggleSelect={handleNodeSelect}
            readOnly
          />
        )}
      {showToggle &&
        showSelectToggle.value &&
        showSelectToggle.key.includes("RDS") && (
          <SelectRdsToggle
          resourceKey={showSelectToggle.key}

            diagram={diagram}
            uniquekey={showSelectToggle.key}
            finalToggleValue={finalToggleValue}
            setFinalToggleValue={setFinalToggleValue}
            readOnly
          />
        )}
      {showToggle &&
        showSelectToggle.value &&
        showSelectToggle.key.includes("Simple Storage Service") && (
          <SelectS3Toggle
          resourceKey={showSelectToggle.key}

            diagram={diagram}
            uniquekey={showSelectToggle.key}
            finalToggleValue={finalToggleValue}
            setFinalToggleValue={setFinalToggleValue}
            readOnly
          />
        )}
      {showToggle &&
        showSelectToggle.value &&
        showSelectToggle.key.includes("AWS_WAF") && (
          <SelectWafToggle
          resourceKey={showSelectToggle.key}

            diagram={diagram}
            uniquekey={showSelectToggle.key}
            finalToggleValue={finalToggleValue}
            setFinalToggleValue={setFinalToggleValue}
            readOnly
          />
        )}
        
        </>
    )};

    export default costToggle;