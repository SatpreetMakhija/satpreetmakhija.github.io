---
layout: post
title: "Why are complex numbers suitable for 2D plane representation?"
date: 2024-04-21 17:12:00
description: 

---

How do you represent a 2D flat surface? The canonical way is using cartesian coordinates. I'll show you why cartesian system or the polar coordinates is not the ideal choice but complex number is to represent 2D surface.

## What are our requirements?
We want our representation of a point so that it is easy to add it to another point and we want rotation of a point to be easy too.

## What cartesian coordinates lack?
Each point in the cartesian coordinate system can be written as $$(x,y)$$ where $$x$$ denotes the distance you walk from the origin in the X axis direction and $$y$$ in the Y axis direction.
Addition definition is trivial in cartesian coordinates. Given two points, $$(x_1, y_1)$$ and $$(x_2, y_2)$$, we can easily add them as $$(x_1+x_2, y_1+y_2)$$. 

Rotation is where coordinates system becomes difficult to use. How do we rotate this point by an angle $$\theta$$. We'll have to use trignometric properties. Let $$R$$ be the function that rotates $$(x,y)$$ by a given angle.
$$R(x,y) = x*R(1,0) + y*R(0,1)$$
$$R(1,0) = (\cos \theta, \sin \theta),  R(0,1) = (-\sin \theta, \cos \theta)$$
$$\therefore R(x,y) = x*(\cos \theta, \sin \theta) + y*(-\sin \theta, \cos \theta)$$
That's a lot of steps for a simple operation of rotating a point in cartesian coordinates.


## What polar coordinates lack?
A 2D point in polar coordinates is represented as $$(x,\theta)$$ where x represents the distance from the origin and $$\theta$$ is the angle. Rotation by $$\phi$$ is simply $$(x, \theta+\phi)$$. But, addition is not defined in polar coordinates this way. Given two points $$(x_1,\theta_2)$$ and $$(x_2,\theta_2)$$, their sum is NOT $$(x_1+x_2, \theta_1 + \theta_2)$$. 


To add two points in polar coordinates, we'll first have to convert them to cartesian coordinates and then add them up as we do in cartesian coordinates.

## What complex numbers solve?
Representation of a point in 2D plane using a complex number makes addition as well as rotation of points easy. A complex number is written as $$z = a + \iota b$$ where $$a$$ is the real part and $$b$$ is the imaginary part. We'll represent a 2D point in complex number form as $$z = r(\cos \theta + \iota \sin \theta)$$. Addition of two points will simply follow as addition defined in complex numbers. $$z_1 = r_1(\cos \theta_1 + \iota \sin \theta_1)$$ and $$z_2 =  r_2(\cos \theta_2 + \iota \sin \theta_2)$$
How do we define rotation by $$\phi$$ for $$z = r(\cos \theta + \iota \sin \theta)$$ ? This is where a theorem by Euler helps. $$z = r(\cos \theta + \iota \sin \theta) = r \iota^{\theta}$$. We define rotation by $$\phi$$ as $$r \iota^{\theta + \phi}$$. Hence, representation of a 2D flat surface using complex numbers provides easy ways to add and rotate points.