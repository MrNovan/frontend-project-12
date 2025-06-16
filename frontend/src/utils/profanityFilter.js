import filter from 'leo-profanity'
import { flatWords, words} from 'russian-bad-words'

filter.add(flatWords)
filter.add(words)

export default filter