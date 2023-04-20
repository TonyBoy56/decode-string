// From Leetcode: Given an encoded string, return its decoded string.

// The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.

// You may assume that the input string is always valid; there are no extra white spaces, square brackets are well-formed, etc. Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k. For example, there will not be input like 3a or 2[4].

// The test cases are generated so that the length of the output will never exceed 105.

// Example 1: Input: s = "3[a]2[bc]"
// Output: "aaabcbc"

// Example 2: Input: s = "3[a2[c]]"
// Output: "accaccacc"

// Example 3: Input: s = "2[abc]3[cd]ef"
// Output: "abcabccdcdcdef"

const stringToDecode = "3[a]2[bc]"

function decodeString(stringToDecode) {
    let i = 0;
    const stack = [];

    while (i < stringToDecode.length) {
        // check that the iteration of i does not contain a closing bracket. 
        if (stringToDecode[i] !== ']') {
            stack.push(stringToDecode[i]);
            
        // if i contains a closing bracket, begin concatenation process. Break on detection of opening bracket
        } else {
            let [res, rep, top] = ['', '', ''];
            
            while (stack.length) {
                top = stack.pop();
                if (top === '[') {
                    break;
                } else {
                    res = top + res
                }
            }

            // if i contains a closing bracket, begin concatenation process. Break on detection of non-numerical value
            while(stack.length) {
                top = stack.pop();
                if(top >= '0' && top <= '9') {
                    rep = top + rep;
                } else {
                    stack.push(top);
                    break;
                }
            }

            // parse res as an integer. use .repeat method on remaining characters of res for the number of ints parsed.
            res = res.repeat(Number.parseInt(rep));
            // push res to the stack
            stack.push(res);
        }
        i++ 
    }

    res = '';
    while (stack.length) {
        // while stack has a valid length, pop the last item in stack and concatenate with current res
        res = stack.pop() + res;
    }
    // run the program to view result in the console
    console.log(res);
}

// instantiate the function
decodeString(stringToDecode);
