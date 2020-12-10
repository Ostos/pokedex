function createProp(word, dict) {
    if(word === '')
        return

    const firstLetter = word[0]

    if(!(firstLetter in dict))
        dict[firstLetter] = {}

    createProp(word.substring(1), dict[firstLetter])
}

export function createDictFromArrayOfWords(arr, dict = {}) {
    for(let i = 0; i < arr.length; i++)
        createProp(arr[i], dict)

    return dict
}

function getSortedKeysFromObj(obj) {
    return Object.keys(obj).sort((a, b) => a < b ? -1 : 1)
}

function getSuggestionsFromDict(dict) {
    let result = []
    let keys = getSortedKeysFromObj(dict)

    if(keys.length === 0)
        return result

    for(let i = 0; i < keys.length; i++) {
        const suggestions = getSuggestionsFromDict(dict[keys[i]])

        if(suggestions.length === 0)
            result.push(keys[i])

        for(let j = 0; j < suggestions.length; j++) {
            result.push(keys[i] + suggestions[j])
        }
    }

    return result
}

function getInnerDict(input, dict) {
    let innerDict = dict
  
    for(let i = 0; i < input.length; i++) {
      if(!(input[i] in innerDict))
        return {}
      
      innerDict = innerDict[input[i]]
    }
    
    return innerDict
}

export function getSearchSuggestions(input, dict) {
    if(input === '') {
      return []
    }
    const innerDict = getInnerDict(input, dict)
    return getSuggestionsFromDict(innerDict).map(suggestion => input + suggestion);
}
