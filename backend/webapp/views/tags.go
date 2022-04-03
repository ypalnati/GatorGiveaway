package views

import "strings"

// split tags string into list of tags
func splitTagStringByHash(tags string) []string {
	return strings.Split(tags, "#")
}

// remove duplicate tags
func removeDuplicateTags(tagList []string) string {
	allKeys := make(map[string]bool)
	list := []string{}
	for _, item := range tagList {
		if _, value := allKeys[item]; !value {
			allKeys[item] = true
			list = append(list, item)
		}
	}
	return strings.Join(list, "#")
}

// remove duplicates from tags
func removeTagDuplicates(tags string) string {
	tagList := splitTagStringByHash(tags)
	return removeDuplicateTags(tagList)
}
