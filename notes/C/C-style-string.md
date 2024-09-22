# C-style string

## String literal/constant

Literal value like below is a C-style string

```cpp
"hello world" // 11 characters surrounded by double quotes
```

The literal value is deduced to be of `char[12]` type because a string is an array of characters technically. The internal representation of a string has a **null character** `'\0'` at the end, whose ASCII code value is 0, so the physical storage required is one more than the number of characters written between the quotes. This means there is no limit to the length of a string. The null character is used to mark the end of the string.

![array](https://hackmd.io/_uploads/rkU5T-Mca.png)


## strlen
The standard library function `strlen(s)` is declared in the standard header `<string.h>`. It returns the lengh of its character string argument `s`, excluding the null character `'\0'`.

How it was implemented:[^1]

```cpp
int strlen(char s[]) {
    int i;
    while(s[i] != '\0')
        ++i;
    return i;
}
```

## Declaration and Initialization

Only the array of characters that has null character at the end is considered a string. Without the null character at the end, it's just an array of characters.

### 1. Declaration and then initialize

```cpp
// 1. str is a string
char str[6];
char_array[0] = 'h';
char_array[1] = 'e';
char_array[2] = 'l';
char_array[3] = 'l';
char_array[4] = 'o';
char_array[5] = '\0';

// 2. char_arr is not a string but an array of characters
char char_arr[3];
char_array[0] = 'a';
char_array[1] = 'b';
char_array[2] = 'c';
```

### 2. Declaration and initilization at once

(1) Declare an array of characters with null character at the end and the length of which is 6.
```cpp
char str[6] = { 'h', 'e', 'l', 'l', 'o', '\0' }; // (1)
```
(2) If the number of items is less than the specified length of array (`5 < 6`), the empty positions(including the last position) will be filled with 0s. And since the last character of a string is null character `'\0'` which is 0 in ASCII, this way of declaration and initialization is same as (1).

```cpp
char str[6] = { 'h', 'e', 'l', 'l', 'o' }; // (2)
```

(3) If the number of items is larger than the specified length of array (`4 > 3`), the comipler might throw error or show warning.
```cpp
char str[3] = { 'd', 'o', 'g', '\0' }; // (3)
```

```
warning: excess elements in array initializer [-Wexcess-initializers]
```

(4) If the number of elements is not specified inside the squre brackets`[]`, the length of the array will be the number of items that are given during initialization. 

For example, it will allocate 6 units of memory to the `str` array since there are 6 items in the curly brackets. Note that the length of array is 6 while the length of string will be 5 since null character is not counted.

```cpp
char str[] = { 'h', 'e', 'l', 'l', 'o', '\0' }; // (4)
```

### 3. Declaration and initilization at once via string literal

(1) The specified length of the array should be the number of charaters of the string plus 1.

For example, there are 5 characters in the double quotes, but it requires 6 units of memory since string literals implicitly have a null charater at the end.

```cpp
char str[6] = "hello"; // (1)
```

(2) The length of the array can be left empty so the compiler will be responsible for deciding the length.

As you can see in the example, the compiler decides that the size of `str` array is 6 bytes, even though there are only 5 characters in the double quotes.

```cpp
char str[] = "hello"; // (2)
printf("The size of str is %lu bytes\n", sizeof(str));
```

Result:
```
The size of str is 6 bytes.
```

(3) Without extra one position for the null character, it can only be considered as a character array. Used it as a string might cause unexpcted results.

For example, the character array `char_arr` has length of 3 and stores 3 characters –`'d', 'o', 'g'`. There is no extra room at the end of `char_arr` for the null character. If we use `char_arr` as a string and passed it to the `strlen` function to get the length, the result might not be 3, but rather a random number depends on when it meets the null character in the sequence of memory that the array is allocated to. In the below example, `strlen` returns 4.

```cpp
char char_arr[3] = "dog"; (3)
printf("strlen of char_arr = %lu", strlen(char_arr));
```
Result:
```
strlen of char_arr = 4
```

### 4. Declaration and inistalization at once via pointer

The name of character array stores the address of first character in the array. A pointer to the character can serve the same purpose and thus we can declare a string using a pointer to the character.

```cpp
char* str = "hello";
```

However, using pointer loses the type and the dimension information, which is know as **array decay**[^2] in C. Most of the time, character array and pointer to character can be used interchangably, but there are some differeces between array name and the pointer that one should be aware of. 

In short, array name cannot be changed unlike pointer can be assigned with new value.

```cpp
char* str_ptr = "hello"; // str_ptr now points to h
str_ptr = str_ptr + 1; // increment is allowed
printf("The 1st-indexed element is = %c", *str); // prints e
```

```cpp
char char_arr[] = "hello";
char_arr = char_arr + 1; // increment is not allowed

char char_arr2[] = "world";
char_arr = str_ptr; // re-assignment is not allowed
char_arr = char_arr2; // re-assignment is not allowed
```

[^1]: K&R The C programming language 2nd edition
[^2]: https://stackoverflow.com/a/1641963/13715554
