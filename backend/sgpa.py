from flask import request,jsonify

def gradePoints(m):
    grade_point = 0
    if m >= 90:
        grade_point = 10
    elif m >= 80:
        grade_point = 9
    elif m >= 70:
        grade_point = 8
    elif m >= 60:
        grade_point = 7
    elif m >= 50:
        grade_point = 6
    elif m >= 45:
        grade_point = 5
    elif m >= 40:
        grade_point = 4
    elif m >= 0:
        grade_point = 0
    elif m == -1:
        grade_point = 0
    return grade_point

def fetch_sgpa(data) :
    count=1
    numerator=0
    credits=0
    total=0
    print(data)
    for k,v in data.items():
        marks = eval(str(v))
        subTotal=int(marks["Total"])
        value = gradePoints(subTotal)
        total+=subTotal
        if count==7:
            count+=1
            continue
        elif count==1 or count==2:
            numerator+=4*value
            credits+=4
        elif count==3 or count==4 or count==8:
            numerator+=3*value
            credits+=3
        numerator+=value
        credits+=1
        count+=1
    return round(numerator/credits,2),total