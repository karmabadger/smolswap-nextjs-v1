import { FC } from "react";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  AttributeResult,
  PropertyWithAttributes,
} from "@utils/parse/attributesQuery";

interface PropertiesDrawerProps {
  property: PropertyWithAttributes;
  attributesChecked: boolean[];
  setAttributesChecked: (attributesChecked: boolean[]) => void;
}

const PropertySection: FC<PropertiesDrawerProps> = ({
  property,
  attributesChecked,
  setAttributesChecked,
}) => {
  const section = property.name;
  const attributesList = property.attributes;

  const handleChange = (choiceIndex: number) => {
    return () => {
      const newAttributesChecked = attributesChecked.map((checked, index) => {
        if (index == choiceIndex) {
          return !checked;
        }
        return checked;
      });
      setAttributesChecked(newAttributesChecked);
    };
  };

  return (
    <Accordion disableGutters elevation={0} key={section}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography sx={{ flexShrink: 0 }}>{section}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormControl sx={{ m: 0 }} component="fieldset" variant="standard">
          <FormGroup>
            {attributesList.map((attribute, index) => {
              const attributeIndex = index || 0;
              const checked = attributesChecked[attributeIndex];
              return (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={checked}
                      size="small"
                      onChange={handleChange(attributeIndex)}
                      name={"attribute"}
                    />
                  }
                  label={
                    <Typography variant="body2" color="text.secondary">{`${
                      attribute.value
                    } (${(parseFloat(attribute.percentage) * 100).toFixed(
                      2
                    )}%)`}</Typography>
                  }
                />
              );
            })}
          </FormGroup>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  );
};

export default PropertySection;
