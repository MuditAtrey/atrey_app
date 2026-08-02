#include <iostream>
#include <type_traits>
#include <typeinfo>
using namespace std;

int main() {
    int arr[10][2][2]; 

    using ElementType = remove_extent<decltype(arr)>::type;

    cout << "The element type is: " << typeid(ElementType).name() << endl;

    return 0;
}
