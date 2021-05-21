import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Root of Equation',
    path: '/RootofEquation',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Bisection',
        path: '/RootofEquation/Bisection',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'False Position',
        path: '/RootofEquation/False_position',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'One-Point Iteration',
        path: '/RootofEquation/Onepoint',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Newton-Raphson',
        path: '/RootofEquation/Newton',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Secant Method',
        path: '/RootofEquation/Secant',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Linear Algebra',
    path: '/LinearAlgebra',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Cramer Rule',
        path: '/LinearAlgebra/Cramer',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Gauss Elimination',
        path: '/LinearAlgebra/GaussElimination',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'LU Decomposition',
        path: '/LinearAlgebra/LuDecomposition',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Jacobi Iteration Method',
        path: '/LinearAlgebra/JacobiIteration',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Gauss Seidel Iteration',
        path: '/LinearAlgebra/GaussSeidel',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Conjugate Gradient Method',
        path: '/LinearAlgebra/ConjugateGradient',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Interpolation',
    path: '/Interpolation',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Newton Divide Difference',
        path: '/Interpolation/NewtonDiff',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Largrange',
        path: '/Interpolation/Largrange',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Spline',
        path: '/Interpolation/Splinex',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Least Squares Regression',
    path: '/LeastSquares',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Linear Regression',
        path: '/LeastSquares/Linearregression',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Polynomial Regression',
        path: '/LeastSquares/Polynomial',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Newton Interpolation',
        path: '/LeastSquares/NewtonIterpolation',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  }
];
