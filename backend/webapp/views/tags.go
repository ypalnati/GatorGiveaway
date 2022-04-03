package views

import "strings"

// split tags string into list of tags
func splitTagStringByHash(tags string) []string {
	return strings.Split(tags, "#")
}

// remove duplicate tags
func removeDuplicateTags(tagList []string) string {
	return strings.Join(tagList, "#")
}

// remove duplicates from tags
func removeTagDuplicates(tags string) string {
	tagList := splitTagStringByHash(tags)
	return removeDuplicateTags(tagList)
}
