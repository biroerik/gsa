using SpacefarerService as service from '../../srv/spacefarer-service';
annotate service.Spacefarers with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'ID',
                Value : ID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'name',
                Value : name,
            },
            {
                $Type : 'UI.DataField',
                Label : 'stardust',
                Value : stardust,
            },
            {
                $Type : 'UI.DataField',
                Label : 'wormholeSkill',
                Value : wormholeSkill,
            },
            {
                $Type : 'UI.DataField',
                Label : 'originPlanet',
                Value : originPlanet,
            },
            {
                $Type : 'UI.DataField',
                Label : 'spacesuitColor',
                Value : spacesuitColor,
            },
            {
                $Type : 'UI.DataField',
                Label : 'email',
                Value : email,
            },
            {
                $Type : 'UI.DataField',
                Label : 'department',
                Value : department,
            },
            {
                $Type : 'UI.DataField',
                Label : 'position',
                Value : position,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'ID',
            Value : ID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'name',
            Value : name,
        },
        {
            $Type : 'UI.DataField',
            Label : 'stardust',
            Value : stardust,
        },
        {
            $Type : 'UI.DataField',
            Label : 'wormholeSkill',
            Value : wormholeSkill,
        },
        {
            $Type : 'UI.DataField',
            Label : 'originPlanet',
            Value : originPlanet,
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action : 'SpacefarerService.EntityContainer/CreateSpacefarer',
            Label : 'CreateSpacefarer',
        },
    ],
    UI.Identification : [
        {
            $Type : 'UI.DataFieldForAction',
            Action : 'SpacefarerService.EntityContainer/UpdateStardust',
            Label : 'UpdateStardust',
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action : 'SpacefarerService.EntityContainer/ChangeSpaceSuitColor',
            Label : 'ChangeSpaceSuitColor',
        },
    ],
);

