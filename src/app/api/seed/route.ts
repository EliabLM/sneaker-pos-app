/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import path from "path";

import brand from './seedData/brand.json';
import category from './seedData/category.json';
import customer from './seedData/customer.json';
import location from './seedData/location.json';
import paymentMethod from './seedData/paymentMethod.json';
import product from './seedData/product.json';
import purchase from './seedData/purchase.json';
import purchaseDetail from './seedData/purchaseDetail.json';
import sale from './seedData/sale.json';
import saleDetail from './seedData/saleDetail.json';
import supplier from './seedData/supplier.json';
import user from './seedData/user.json';

const prisma = new PrismaClient();

const DATA = [
    { value: 'brand.json', data: brand },
    { value: 'category.json', data: category },
    { value: 'customer.json', data: customer },
    { value: 'location.json', data: location },
    { value: 'paymentMethod.json', data: paymentMethod },
    { value: 'product.json', data: product },
    { value: 'purchase.json', data: purchase },
    { value: 'purchaseDetail.json', data: purchaseDetail },
    { value: 'sale.json', data: sale },
    { value: 'saleDetail.json', data: saleDetail },
    { value: 'supplier.json', data: supplier },
    { value: 'user.json', data: user }
];

async function deleteAllData(orderedFileNames: string[]) {
    const modelNames = orderedFileNames.map((fileName) => {
        const modelName = path.basename(fileName, path.extname(fileName));
        return modelName.charAt(0).toUpperCase() + modelName.slice(1);
    });

    for (const modelName of modelNames.reverse()) {
        const model: any = prisma[modelName as keyof typeof prisma];
        if (model) {
            await model.deleteMany({});
            console.log(`Cleared data from ${modelName}`);
        } else {
            console.error(
                `Model ${modelName} not found. Please ensure the model name is correctly specified.`,
            );
        }
    }
}

export async function main() {

    const orderedFileNames = [
        "brand.json",
        "category.json",
        "location.json",
        "paymentMethod.json",
        "product.json",
        "user.json",
        "supplier.json",
        "customer.json",
        "sale.json",
        "saleDetail.json",
        "purchase.json",
        "purchaseDetail.json",
    ];

    await deleteAllData(orderedFileNames);

    for (const fileName of orderedFileNames) {
        const jsonData = DATA.filter(item => item.value === fileName)[0].data;
        const modelName = path.basename(fileName, path.extname(fileName));
        const model: any = prisma[modelName as keyof typeof prisma];

        if (!model) {
            console.error(`No Prisma model matches the file name: ${fileName}`);
            continue;
        }

        for (const data of jsonData) {
            await model.create({
                data,
            });
        }

        console.log(`Seeded ${modelName} with data from ${fileName}`);
    }

    console.log('✅ Seeding complete!');
}

//req is short for request
export async function GET() {
    try {
        main()
            .catch((e) => {
                console.error(e);
            })
            .finally(async () => {
                await prisma.$disconnect();
            });


        return NextResponse.json(
            { message: "this is a get request" },
            { status: 200 }
        );
    } catch (error) {
        console.error("🚀 ~ GET ~ error:", error)
    }
}

export async function DELETE() {
    try {
        const orderedFileNames = [
            "brand.json",
            "category.json",
            "location.json",
            "paymentMethod.json",
            "product.json",
            "user.json",
            "supplier.json",
            "customer.json",
            "sale.json",
            "saleDetail.json",
            "purchase.json",
            "purchaseDetail.json",
        ];

        await deleteAllData(orderedFileNames.reverse());

        return NextResponse.json({
            message: 'Data deleted successfully',
            status: 200
        })
    } catch (error) {
        console.error("🚀 ~ DELETE ~ error:", error)
    }
}