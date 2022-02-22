import { QueryResult } from "@apollo/client";
import { GetCollectionAttributesQuery, Exact, Attribute } from "@graphql/generated/tm/react-apollo";


interface AttributeResult {
    __typename?: "Attribute" | undefined;
    name: string;
    percentage?: any | null;
    value: string;
    index?: number | null;
}

type AttributesDictByPropertyName = {
    [key: string]: AttributeResult[];
};

type AttributesList = AttributeResult[];


interface PropertyWithAttributes {
    name: string;
    attributes: AttributeResult[];
}

interface PropertiesDictWithAttributes {
    [key: string]: PropertyWithAttributes;
}

type PropertiesListWithAttributes = PropertyWithAttributes[];

interface AttributesObj {
    dictByPropertyName: AttributesDictByPropertyName;
    allAttributesOrderedList: AttributesList;
    propertiesListWithAttributes: PropertiesListWithAttributes;
}

function getAttributesObj(queryResult: QueryResult<GetCollectionAttributesQuery, Exact<{ id: string }>>): AttributesObj {
    if (!queryResult.data) {
        return {
            dictByPropertyName: {},
            allAttributesOrderedList: [],
            propertiesListWithAttributes: [],
        }
    }

    if (!queryResult.data.collection) {
        return {
            dictByPropertyName: {},
            allAttributesOrderedList: [],
            propertiesListWithAttributes: [],
        }
    }

    const attributesResult = queryResult.data.collection.attributes;

    if (!attributesResult) {
        return {
            dictByPropertyName: {},
            allAttributesOrderedList: [],
            propertiesListWithAttributes: [],
        }
    }

    const attributesDictByPropertyName: AttributesDictByPropertyName = {};

    for (let i = 0; i < attributesResult.length; i++) {
        const attributeRes = attributesResult[i];
        const attribute: AttributeResult = {
            __typename: "Attribute",
            name: attributeRes.name,
            percentage: attributeRes.percentage,
            value: attributeRes.value,
            index: null,
        };


        if (attributesDictByPropertyName[attribute.name]) {
            attributesDictByPropertyName[attribute.name].push(attribute);
        } else {
            attributesDictByPropertyName[attribute.name] = [attribute];
        }
    }

    const allAttributesSortedList: AttributesList = [];
    const propertiesListListWithAttributes: PropertiesListWithAttributes = [];
    for (const propertyName in attributesDictByPropertyName) {
        const attributesList = attributesDictByPropertyName[propertyName];

        // sort by percentage
        attributesList.sort((a, b) => {
            if (a.percentage && b.percentage) {
                return parseFloat(a.percentage) - parseFloat(b.percentage);
            } else if (a.percentage) {
                return 1;
            } else if (b.percentage) {
                return -1;
            } else {
                return 0;
            }
        });

        const propertyWithAttributes: PropertyWithAttributes = {
            name: propertyName,
            attributes: attributesList
        };
        propertiesListListWithAttributes.push(propertyWithAttributes);

        for (let i = 0; i < attributesList.length; i++) {
            const attribute = attributesList[i];
            attribute.index = allAttributesSortedList.length;
            allAttributesSortedList.push(attribute);
        }
    }

    return {
        dictByPropertyName: attributesDictByPropertyName,
        allAttributesOrderedList: allAttributesSortedList,
        propertiesListWithAttributes: propertiesListListWithAttributes,
    };
}


export {
    getAttributesObj,
    type AttributesObj,
    type AttributesDictByPropertyName,
    type AttributesList,
    type AttributeResult,
    type PropertyWithAttributes,
    type PropertiesDictWithAttributes,
    type PropertiesListWithAttributes,
};