#include <iostream>
#include <cmath>
using namespace std;

//Receiving height and width values
void data_reception(int& height, int& length)
{
	cout << "Press tower height" << endl;
	cin >> height;
	//integrity check
	while(height < 2)
	{
		cout << "The height is incorrect. It should be greater than or equal to 2" << endl;
		cout << endl;
		cout << "Press tower height" << endl;
		cin >> height;
	}
	cout << "Press tower length" << endl;
	cin >> length;
}


//Calculations for a rectangle
void rectangle(int height, int length)
{
	//Checking whether it is a square or a rectangle with the difference between the lengths of its sides greater than 5
	if (height == length || abs(height - length) > 5)
		cout << "The area is: " << height * length << endl;
	else
		cout << "The perimeter is: " << 2 * height + 2 * length << endl;
}


//The triangle print
void triangle_print(int numOfOdd, int lines, int height, int length)
{
	int  odd = 3;
	//The asterisk triangle print
	//Print the first line
	for (int m = 1; m <= (length - 1) / 2; m++)
	{
		cout << " ";
	}
	cout << "*" << endl;

		//A loop that ran over the number of additional rows needed for number 3
		for (int i = 0; i < (height - 2) - (lines * numOfOdd); i++)
		{
			//Printing spaces to place the triangle in the middle
			for (int m = 1; m <= (length - 3) / 2; m++)
			{
				cout << " ";
			}
			cout << "***" << endl;
		}

	//A loop that runs as many times as the number of odd numbers that exist in the desired range
	for (int i = 0; i < numOfOdd; i++)
	{
		//A loop that runs as many rows as needed for each odd number
		for (int j = 0; j < lines; j++)
		{
			//Printing spaces to place the triangle in the middle
			for (int m = 0; m < (length - odd) / 2; m++)
			{
				cout << " ";
			}
			//Print a line of asterisks as the number of the current odd number
			for (int k = 0; k < odd; k++)
			{
				cout << "*";
			}
			cout << endl;
		}
		//Increase the odd number to the next odd number
		odd += 2;
	}
	//Print the last line
	for (int i = 0; i < length; i++)
		cout << "*";
}

//Calculations for a triangle
void triangular(int height, int length)
{
	int choiceTriangle, numOfOdd, lines;
	float side;
	do {
		cout << "To calculate the perimeter of the triangle press 1\nTo print the triangle press 2" << endl;
		cin >> choiceTriangle;

		switch (choiceTriangle)
		{
		case 1:
			//Calculate the perimeter of the triangle
			side = sqrt(pow(height, 2) + pow(length / 2, 2));
			cout << "The perimeter is: " << 2 * side + length << endl;
			break;
		case 2:
			//Checking whether the width of the triangle(length) is an even number or whether its width(length) is More than twice as long as it is tall(height)
			if (length % 2 == 0 || length > 2 * height)
				cout << "The triangle cannot be printed" << endl;
			else
			{
				//numOffOdd is the number of odd numbers
				//lines is the number of lines needed for each number

				//An extreme case of a base that is equal to 3
				if (length == 3)
				{
					numOfOdd = 1;
					lines = (height - 2);
				}
				else
				{
					numOfOdd = (length - 2) / 2;
					lines = (height - 2) / numOfOdd;
				}

				//The triangle print
				triangle_print(numOfOdd, lines, height, length);
			}
			break;
		default:
			cout << "Invalid choice. Please enter 1 or 2." << endl;
			cout << endl;
			break;
		}
	} while (choiceTriangle != 1 && choiceTriangle != 2);
}


int main()
{
	int choice = 0, height = 0, length = 0;
	do {
		cout << "For a rectangle tower press 1 \nFor a triangular tower press 2\nTo exit press 3" << endl;
		cin >> choice;

		switch (choice)
		{
		case 1:
			data_reception(height, length);
			rectangle(height, length);
			exit(0);
			break;
		case 2:
			data_reception(height, length);
			triangular(height, length);
			exit(0);
			break;
		case 3:
			cout << "Exiting program..." << endl;
			exit(0);
		default:
			cout << "Invalid choice. Please enter 1, 2, or 3." << endl;
			while (choice != 1 && choice != 2 && choice != 3) {
				cout << "For a rectangle tower press 1 \nFor a triangular tower press 2\nTo exit press 3" << endl;
				cin >> choice;
			}
			break;
		}
	} while (choice != 1 && choice != 2);
}


